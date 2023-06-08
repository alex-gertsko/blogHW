from settings import dbUserName, dbPassword 
import mysql.connector as mysql
from flask import Flask, request, abort, make_response
import json
from loginManager import loginManager
import uuid
import bcrypt

latestQeury = 'select posts.*, users.username as authorName from posts inner join users on posts.userId = users.id ORDER BY posts.created_at DESC LIMIT 5;'
insertRowQeury = 'insert into {table} ({fields}) values ({values})'
fieldsToAvoid = ['id', 'created_at']

db = mysql.connect(
    host = 'localhost',
    port= 3033,
    user = dbUserName,
    passwd = dbPassword,
    database = 'blog'
)
def init():
    global postColumns
    cursor = db.cursor()
    try:
        cursor.execute('select * from posts limit 1')
        postColumns = extractFields(cursor)
        # cursor.reset()
    except:
        print('init failed')
    else:
        print('init succeeded!!')
    finally:
        # cursor.reset()
        cursor.fetchall()
        cursor.close()

app = Flask(__name__)


@app.get('/posts')
def manageHomepage():
    def infinite_sequence():
        num = 0
        while True:
            yield num
            num += 1
    gen = infinite_sequence()
    limit = request.values.get('limit')
    if(limit == None):
        limit = 5
    latestQeurylimited = latestQeury.format(limit=limit)
    cursor = db.cursor()
    cursor.execute(latestQeurylimited)
    res = cursor.fetchall()
    header = [entry[0] for entry in cursor.description]
    cursor.close()
    data = { next(gen):x for x in map(lambda x: makeJson(header, x), res)}
    return json.dumps(data)

@app.route('/hello')
def hello_world():
    return "<p>Hello, World!</p>"

@app.post('/post')
def addPost():
    body = request.json
    table = 'posts'
    cursor = db.cursor()
    res = ''
    if not login.checklogin():
        abort(401)
    try:
        columns = [x for x in postColumns]
        removeUnnecesaryFields(columns)
        values = tuple(body[column] for column in columns)
        placeholder = makePlaceHolder(columns)
        query = insertRowQeury.format(table=table, fields=','.join(columns), values=placeholder)
        # cursor = db.cursor()
        cursor.execute(query, tuple(values))
        db.commit()
        res = getPost(cursor.lastrowid)
    except Exception as err:
        res = err
    finally:
        cursor.close()
        return res

@app.post('/register')
def handleRegister():
    try:
        username, password = request.json['username'], request.json['password']
        password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        # password = password.decode('utf8')
        fields= ['username', 'password']
        placeholder = makePlaceHolder(fields)
        registerQeury = insertRowQeury.format(table='users', fields=','.join(fields), values=placeholder)
        with db.cursor() as cursor:
            cursor.execute(registerQeury, tuple([username, password]))
            res = cursor.fetchall()
            db.commit()
            return json.dumps({'status': 200, 'message': 'registered succeed'})

    except mysql.errors.IntegrityError:
        abort(409, "Wrong input key was given or not given") # 422 - wrong input code
    except KeyError:
        abort(422) # duplicate key status code
    except Exception as e:
        print(e)
        abort(500)


@app.get('/post/<id>')
def getPost(id):
    query = "select posts.*, users.username as authorName from posts inner join users on posts.userId = users.id where posts.id = %s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    header = [entry[0] for entry in cursor.description]
    cursor.close()
    ans = makeJson(header, record)
    return json.dumps(ans)

def makeJson(colums, values):
    return json.loads(json.dumps(dict(zip(colums, stringify(values)))))

def stringify(values):
    return map(lambda x: str(x), values)

def extractFields(cursor):
    return [entry[0] for entry in cursor.description]

def removeUnnecesaryFields(list):
    for field in fieldsToAvoid:
        try:
            list.remove(field)
        except:
            pass

def extractValues(columns: list[str]):
    values = []
    for col in columns:
        try:
            values.append(str(request.json[col]))
        except:
            columns.remove(col)
    return values

def makePlaceHolder(arr: list):
    return ('%s,'*len(arr))[:-1]

init()
login = loginManager(app, db)
app.run(debug=True, port=3333)