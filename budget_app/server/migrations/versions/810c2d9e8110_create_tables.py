"""Create tables

Revision ID: 810c2d9e8110
Revises: 18beed156422
Create Date: 2023-09-07 15:11:29.062801

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '810c2d9e8110'
down_revision = '18beed156422'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
