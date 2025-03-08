from sqlalchemy.ext.asyncio import AsyncSession

from Models.HistoryModel import HistoryResponseModel


class HistoryService:
    def __init__(self, db: AsyncSession):
        self.db = db
