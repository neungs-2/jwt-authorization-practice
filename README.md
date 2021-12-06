# JSON Web Token with Redis

This is simple JWT practice with Redis.

<br>

## **Install node_modules**

- express
- jsonwebtoken
- nodemon
- redis
- dotenv

`npm i express jsonwebtoken nodemon redis dotenv`

<br>

## **Redis control**

```shell
# 서버 실행 (or 데몬 실행) 후 cli 열기
$> redis-server  #서버 실행
$> redis-server --daemonize yes #데몬(서비스) 실행
$> redis-cli shutdown # 서버 실행 종료

$> redis-cli # cli 열기

127.0.0.1:6379> set counter 0

127.0.0.1:6379> get counter
"0"

```
