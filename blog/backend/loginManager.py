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
            with self.db.cursor() as cursor:
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
                cursor = self.db.cursor()
                cursor.execute(query, values)
                self.db.commit()
                cursor.close()
                resp = make_response()
                resp.set_cookie("sessionId", session_id)
                return resp
            
        @self.app.get('/checklogin')
        def quickLoginCheck():
            if not check_login():
                abort(401)
            return {"status": 200, 'login': True}
        
        @self.app.get('/logout')
        def logout():
            session_id = request.cookies.get("sessionId")
            if (type(session_id) != type('')):
                abort(500)
            query = "delete from sessions where id = %s"
            values = (session_id,)
            cursor = self.db.cursor()
            try:
                cursor.execute(query, values)
                record = cursor.fetchone()
                self.db.commit()
                cursor.close()
                return {'message': 'deleted session'}
            except Exception as e:
                abort(500)
            
            
            

        def check_login():
            session_id = request.cookies.get("sessionId")
            if not session_id:
                return False
            query = "select userId from sessions where id = %s"
            values = (session_id,)
            cursor = self.db.cursor()
            cursor.execute(query, values)
            record = cursor.fetchone()
            cursor.close()
            if not record:
                return False
            return True
        
        self.checklogin = check_login