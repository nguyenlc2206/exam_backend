import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    Unique,
    JoinTable,
    DeleteDateColumn
} from 'typeorm';
import UsersEntity from '@src/domain/entities/user.entity';
import ExamsEntity from '@src/domain/entities/exam.entity';

/** Define group role entity */
@Entity()
@Unique(['user', 'exam'])
class ExamUserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    })
    createdAt: Date;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    })
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => UsersEntity, (user) => user.examUser, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'userId'
    })
    user: UsersEntity;

    @ManyToOne(() => ExamsEntity, (exam) => exam.examUser, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'examId'
    })
    exam: ExamsEntity;
}

export default ExamUserEntity;
