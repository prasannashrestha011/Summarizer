from fastapi import FastAPI
from dotenv import load_dotenv
from app.configs.cors import add_cors_middleware
from app.middlewares.middlewares import AuthMiddlware

load_dotenv()
# app routes
from app.routes.AuthRoute import router as auth_routes
from app.routes.HomeRoute import router as home_routes

app = FastAPI()

# cors configuration
add_cors_middleware(app)

# app middlewares
app.add_middleware(AuthMiddlware)

# necessary routes
app.include_router(home_routes)
app.include_router(auth_routes)
