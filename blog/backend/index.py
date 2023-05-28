from settings import dbUserName, dbPassword 
import mysql.connector as mysql
from flask import Flask, request
import json

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
        cursor.reset()
    except:
        print('init failed')
    else:
        print('init succeeded!!')
    finally:
        cursor.reset()
        cursor.close()

app = Flask(__name__)


@app.route('/home')
def manageHomepage():
    def infinite_sequence():
        num = 0
        while True:
            yield num
            num += 1
    gen = infinite_sequence()
    cursor = db.cursor()
    cursor.execute(latestQeury)
    res = cursor.fetchall()
    cursor.close()
    header = [entry[0] for entry in cursor.description]
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
    try:
        columns = [x for x in postColumns]
        removeUnnecesaryFields(columns)
        values = tuple(body[column] for column in columns)
        placeholder = ('%s,'*len(columns))[:-1]
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

@app.get('/post/<id>')
def getPost(id):
    query = "select posts.*, users.username as authorName from posts inner join users on posts.userId = users.id where posts.id = %s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    header = [entry[0] for entry in cursor.description]
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

init()
app.run(debug=True, port=3333)