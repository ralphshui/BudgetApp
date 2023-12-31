"""creating tables

Revision ID: c9a483b6d097
Revises: e816415d3c0c
Create Date: 2023-09-13 18:47:39.981178

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9a483b6d097'
down_revision = 'e816415d3c0c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transactions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('type', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transactions', schema=None) as batch_op:
        batch_op.drop_column('type')

    # ### end Alembic commands ###
