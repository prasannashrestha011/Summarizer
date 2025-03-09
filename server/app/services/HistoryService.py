from sqlalchemy.ext.asyncio import AsyncSession

from Models.HistoryModel import HistoryModel, HistoryResponseModel


class HistoryService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_new_chat(self, user_id: str):
        async with self.db.begin():
            history_model = HistoryModel(user_id=user_id)
            self.db.add(history_model)
