from pydantic import BaseModel, Field
from datetime import datetime


class Conversation_Messages(BaseModel):
    role: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.now())
