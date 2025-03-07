"""OAuth user model name changed

Revision ID: e3616dbacfb5
Revises: 824ac7e075ad
Create Date: 2025-03-07 20:33:47.161666

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'e3616dbacfb5'
down_revision: Union[str, None] = '824ac7e075ad'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('oauth_model',
    sa.Column('userId', sa.Uuid(), nullable=False),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('email', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('userId')
    )
    op.drop_column('user_model', 'test')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_model', sa.Column('test', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_table('oauth_model')
    # ### end Alembic commands ###
