import json
import uuid
import bcrypt
from flask import Flask, request, abort, make_response

class loginManager:
    def __init__(self, app, db) -> None:
        self.app = app
        self.db = db
        self.init()

    def init(self):
        @self.app.post('/login')
        def login():
            data = request.get_json()
            print(data)
            if check_login():
                return {"status": 200, 'login': True}
            query = "select id, username, password from users where username = %s"
            values = (data['username'], )
            with self.db() as db:
                with db.cursor() as cursor:
                    cursor.execute(query, values)
                    record = cursor.fetchone()
                    cursor.close()

                    if not record:
                        abort(401)

                    user_id = record[0]
                    hashed_pwd = record[2]
                    hashed_pwd = hashed_pwd.encode('utf-8')
                    if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_pwd) != hashed_pwd:
                        abort(401)

                    query = "insert into sessions (userId, id) values (%s, %s)"
                    session_id = str(uuid.uuid4())
                    values = (record[0], session_id)
                    cursor = db.cursor()
                    cursor.execute(query, values)
                    db.commit()
                    cursor.close()
                    resp = make_response()
                    resp.set_cookie("sessionId", session_id)
                    return resp

        @self.app.get('/logout')
        def logout():
            session_id = request.cookies.get("sessionId")
            if (type(session_id) != type('')):
                abort(500)
            query = "delete from sessions where id = %s"
            values = (session_id,)
            with self.db() as db:
                cursor = db.cursor()
                try:
                    cursor.execute(query, values)
                    record = cursor.fetchone()
                    db.commit()
                    cursor.close()
                    res = make_response("Cookie Removed")
                    res.set_cookie('sessionId', session_id, max_age=0)
                    return res
                except Exception as e:
                    abort(500)


        @self.app.get('/personalpost')
        def getPersonalPosts():
            id = check_login()
            if not id:
                abort(401)
            # pageNumber = request.args.get('page')
            # pageSize = request.args.get('size')
            query = "select posts.*, users.username as authorName from posts inner join users on posts.userId = users.id where users.id = %s"
            try:
                res = queryDB(query, (id,))
                if res == None:
                    res = []
                return res
            except Exception as e:
                print(e)
                abort(500)


        def check_login():
            session_id = request.cookies.get("sessionId") #'1acf2e54-b8b1-4715-92ad-1b88b47b5041' #'f3d30daf-c4f7-4df1-b245-082a12f2ef15' #request.cookies.get("sessionId")
            if not session_id:
                return False
            query = "select userId from sessions where id = %s"
            values = (session_id,)
            with self.db() as db:
                cursor = db.cursor()
                cursor.execute(query, values)
                record = cursor.fetchone()
                cursor.close()
                if not record:
                    return False
                return record[0]
     
        def queryDB(query: str, params: tuple):
            """
            params - query string, tuple of params in needed
            """
            values = params
            with self.db() as db:
                with db.cursor() as cursor:
                    cursor.execute(query, values)
                    record = cursor.fetchall()
                    if record == None: # if nothing was found
                        return record
                    header = [entry[0] for entry in cursor.description]
                    ans = [makeJson(header, rec) for rec in record]
                    return json.dumps(ans)

        def makeJson(colums, values):
            return json.loads(json.dumps(dict(zip(colums, stringify(values)))))

        def stringify(values):
            return map(lambda x: str(x), values)

        self.checklogin = check_login
        self.getPersonalPosts = getPersonalPosts