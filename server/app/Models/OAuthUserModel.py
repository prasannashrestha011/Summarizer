from datetime import datetime
import uuid

from sqlalchemy import func
from sqlmodel import SQLModel, Field


class OAuthUserModel(SQLModel, table=True):
    __tablename__ = "oauth_model"
    userId: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    email: str
    created_at: datetime = Field(default_factory=lambda: datetime.now())
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(),
        sa_column_kwargs={"onupdate": func.now()},
    )
