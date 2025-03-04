from dotenv import load_dotenv
import jwt
import os
from datetime import UTC, datetime, timedelta, timezone, tzinfo

from app.Models.UserModels import AccessTokenModel


class JwtService:

    load_dotenv()
    SecretKey = os.getenv("SECRET_KEY")
    Algorithm = os.getenv("HASHING_ALG")
    ACCESS_EXP_MINUTES = int(os.getenv("ACCESS_EXP_MINUTES"))
    REFRESH_EXP_HOUR = int(os.getenv("REFRESH_EXP_HOUR"))

    @staticmethod
    def _current_timestamp() -> float:
        """Returns current UTC timestamp"""
        return datetime.now(tz=timezone.utc).timestamp()

    @staticmethod
    def create_access_token(username: str) -> str:
        now = datetime.now(tz=timezone.utc)
        access_exp_time = now + timedelta(hours=JwtService.ACCESS_EXP_MINUTES)
        payload = {
            "sub": username,
            "exp": int(access_exp_time.timestamp()),
            "iat": int(datetime.now(tz=timezone.utc).timestamp()),
        }
        access_token = jwt.encode(payload, JwtService.SecretKey, JwtService.Algorithm)

        return access_token

    @staticmethod
    def create_refresh_token(username: str) -> str:
        now = datetime.now(tz=timezone.utc)
        print(JwtService.REFRESH_EXP_HOUR)
        refresh_exp_time = now + timedelta(hours=JwtService.REFRESH_EXP_HOUR)
        payload = {"sub": username, "exp": int(refresh_exp_time.timestamp())}
        refresh_token = jwt.encode(payload, JwtService.SecretKey, JwtService.Algorithm)
        print(refresh_token)
        return refresh_token

    @staticmethod
    def create_token(username: str) -> dict:

        access_token = JwtService.create_access_token(username)

        refresh_token = JwtService.create_refresh_token(username)

        return {"access_token": access_token, "refresh_token": refresh_token}

    @staticmethod
    def verify_token(token: str):
        try:
            payload = jwt.decode(
                token, JwtService.SecretKey, algorithms=[JwtService.Algorithm]
            )

            exp_time = payload.get("exp")
            iat = payload.get("iat")
            if exp_time:
                readable_exp_time = datetime.fromtimestamp(
                    exp_time, tz=timezone.utc
                ).strftime("%Y-%m-%d %H:%M:%S UTC")
                readable_iat_time = datetime.fromtimestamp(
                    iat, tz=timezone.utc
                ).strftime("%Y-%m-%d %H:%M:%S UTC")
                readable_current_time = datetime.fromtimestamp(
                    datetime.now().timestamp(), tz=timezone.utc
                )
                print("current time", readable_current_time)
                print("expire time", readable_exp_time)
                print("issued time", readable_iat_time)

            return {"payload": payload, "error": None}

        except jwt.ExpiredSignatureError as e:
            return {"payload": None, "error": "Token expired"}
        except jwt.InvalidTokenError as e:
            print(e)
            return {"payload": None, "error": "Invalid token"}

    @staticmethod
    def renew_access_token(refresh_token: str):
        print("Refresh token", refresh_token)
        try:
            payload = jwt.decode(
                refresh_token, JwtService.SecretKey, algorithms=JwtService.Algorithm
            )
            new_access_token = JwtService.create_access_token(payload["sub"])
            return AccessTokenModel(access_token=new_access_token, error=None)
        except jwt.ExpiredSignatureError as e:
            return AccessTokenModel(
                access_token="", error="Session expired, please login"
            )
        except jwt.InvalidTokenError as e:
            print(e)
            return AccessTokenModel(access_token=None, error="Invalid refresh token")
