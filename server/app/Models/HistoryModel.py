from datetime import datetime
from typing import Optional
import uuid

from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel


class HistoryModel(SQLModel, table=True):
    __tablename__ = "user_history"
    chat_id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: str
    messages: Optional[list["ConversationMessage"]] = Relationship(
        back_populates="chat"
    )


class ConversationMessage(SQLModel, table=True):
    __tablename__ = "converstaion_messages"
    conv_id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
    role: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now())
    chat_id: uuid.UUID = Field(foreign_key="user_history.chat_id")
    chat: Optional[HistoryModel] = Relationship(back_populates="messages")


class HistoryResponseModel(BaseModel):
    user_id: str
    messages: list["ConversationMessage"] = []
