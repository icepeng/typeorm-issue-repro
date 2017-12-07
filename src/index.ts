import {
  Column,
  Connection,
  createConnection,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('class')
class TestEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column('json')
  item: {
    str: string;
    num: number;
  };
}

async function test() {
  const connection: Connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    database: 'test',
    logging: ['query'],
    synchronize: true,
    entities: [TestEntity],
  });

  const repo = connection.createEntityManager().getRepository(TestEntity);

  const entityInsert = repo.create({
    item: {
      str: 'this is string',
      num: 1,
    },
  });

  const inserted = await repo.save(entityInsert);

  const entityUpdate = repo.create({
    id: inserted.id,
    item: {
      str: 'this is new string',
      num: 2,
    },
  });

  await repo.save(entityUpdate);
}

test();
