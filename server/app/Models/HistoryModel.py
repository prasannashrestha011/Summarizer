from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel


class HistoryModel(SQLModel, table=True):
    __tablename__ = "user_history"
    chat_id: str = Field(primary_key=True)
    user_id: str
    messages: list["ConversationMessage"] = Relationship(back_populates="chat")


class ConversationMessage(SQLModel, table=True):
    __tablename__ = "converstaion_messages"

    role: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now())
    chat_id: str = Field(primary_key=True, foreign_key="user_history.chat_id")
    chat: Optional[HistoryModel] = Relationship(back_populates="messages")


class HistoryResponseModel(BaseModel):
    user_id: str
    messages: list["ConversationMessage"]
