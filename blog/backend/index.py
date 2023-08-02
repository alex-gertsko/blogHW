from settings import dbUserName, dbPassword, dbHost, dbPost
#import mysql.connector as mysql
from flask import Flask, request, abort, make_response
import json
from loginManager import loginManager
import uuid
import bcrypt
import mysql.connector, mysql.connector.pooling
latestQeury = 'select posts.*, users.username as authorName from posts inner join users on posts.userId = users.id ORDER BY posts.created_at DESC LIMIT 5;'
insertRowQeury = 'insert into {table} ({fields}) values ({values})'
fieldsToAvoid = ['id', 'created_at']

#db = mysql.connect(
#    host = dbHost,
#    port= dbPost,
gg    user = dbUserName,
#    passwd = dbPassword,
#    database = 'blog'
#)
pool = mysql.connector.pooling.MySQLConnectionPool(
    host = dbHost,
    port= dbPost,
    user = dbUserName,
    passwd = dbPassword,
    database = 'blog',
    buffered = True,
    pool_size = 3,
    pool_name = "mypool"
)

# def with_connection(f):
#     def decorated_function(*args, **kwargs):
#         db = pool.get_connection()
#         result = f(db, *args, **kwargs)
#         db.close()
#         return result
#     return decorated_function

def init():
    with pool.get_connection() as db:
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

app = Flask(__name__ ,static_folder='../front/build', static_url_path='/')
@app.route('/')
def index():
    return app.send_static_file("index.html")

login = loginManager(app, pool.get_connection)


def infinite_sequence():
        num = 0
        while True:
            yield num
            num += 1

@app.get('/posts')
def manageHomepage():
    with pool.get_connection() as db:
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
    with pool.get_connection() as db:
        body = request.json
        table = 'posts'
        cursor = db.cursor()
        res = ''
        id = login.checklogin()
        if not login.checklogin():
            cursor.close()
            abort(401)
        body['userId'] = id
        try:
            columns = [x for x in postColumns]
            removeUnnecesaryFields(columns)
            values = tuple(body[column] for column in columns)
            placeholder = makePlaceHolder(columns)
            query = insertRowQeury.format(table=table, fields=','.join(columns), values=placeholder)
            #cursor = db.cursor()
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
    with pool.get_connection() as db:
        try:
            username, password = request.json['username'], request.json['password']
            password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            # password = password.decode('utf8')
            fields= ['username', 'password']
            placeholder = makePlaceHolder(fields)
            registerQeury = insertRowQeury.format(table='users', fields=','.join(fields), values=placeholder)
            with db.cursor() as cursor:
                cursor.execute(registerQeury, tuple([username, password]))
                #res = cursor.fetchall()
                db.commit()
                cursor.close()
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
    with pool.get_connection() as db:
        query = "select posts.*, users.username as authorName from posts inner join users on posts.userId = users.id where posts.id = %s"
        values = (id,)
        cursor = db.cursor()
        cursor.execute(query, values)
        record = cursor.fetchall()
        if len(record) == 0:
            return False # no record was found
        header = [entry[0] for entry in cursor.description]
        cursor.close()
        ans = makeJson(header, record[0])
        return json.dumps(ans)

@app.delete("/post/<id>")
def deletePost(id):
    with pool.get_connection() as db:
        userId = login.checklogin()
        if not userId:
            abort(401)
        post = getPost(id)
        if not post:
            abort(404) # not found status code
        post = json.loads(post)
        if not post['userId'] == str(userId):
            abort(403) # access denied code
        query = "delete from posts WHERE posts.id = %s"
        values = (id,)
        with db.cursor() as cursor:
            cursor.execute(query, values)
            #record = cursor.fetchall()
            #if len(record) == 0:
            db.commit()
            return {'status': 200, 'message': f"deleteding post {id} successed"}

@app.route("/post/<id>" , methods = ['PATCH'])
def updatePost(id):
    with pool.get_connection() as db:
        userId = login.checklogin()
        if not userId:
            abort(401)
        post = getPost(id)
        if not post:
            abort(404) # not found status code
        post = json.loads(post)
        if not post['userId'] == str(userId):
            abort(403) # access denied code
        with db.cursor() as cursor:
            # cursor.execute("select * from comments limit 1")
            # record = cursor.fetchall()
            body = request.json
            body['userId'] = userId
            columns = tuple(c for c in postColumns if c not in fieldsToAvoid)
            # header = (entry[0] for entry in cursor.description)
            # cursor.close()
            # ans = makeJson(header, record[0])
            placeHolfers = ",".join([c+"=%s" for c in columns])
            values = tuple(str(body[field]) for field in columns)
            query = f'UPDATE posts SET {placeHolfers} where id={id}'
            cursor.execute(query, values)
            #res = cursor.fetchall()
            db.commit()
            return {'status': 200, 'message': 'updated post {id} successfully'}

@app.post("/post/comments/<id>")
def createComment(id):
    with pool.get_connection() as db:
        userId = login.checklogin()
        if not userId:
            abort(401)
        body = request.json
        if not type(body['comment']) == type(''):
            abort(400) # bad request
        with db.cursor() as cursor:
            query = f"insert into comments (postId, userId, comment) values ({id},{userId},%s)"
            values = (body['comment'],)
            cursor.execute(query, values)
            #res = cursor.fetchall()
            db.commit()
            return {'status': 200, "message": "comment added"}

@app.get("/post/comments/<id>")
def getComments(id):
    with pool.get_connection() as db:
        with db.cursor() as cursor:
            query = "select comments.*, users.username as authorName from comments inner join users on comments.userId = users.id where comments.postId = %s"
            values = (id,)
            cursor.execute(query, values)
            res = cursor.fetchall()
            gen = infinite_sequence()
            header = [entry[0] for entry in cursor.description]
            data = { next(gen):x for x in map(lambda x: makeJson(header, x), res)}
            return json.dumps(data)



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


if __name__ == '__main__':
    init()
    app.run(host='0.0.0.0', port=5000)
