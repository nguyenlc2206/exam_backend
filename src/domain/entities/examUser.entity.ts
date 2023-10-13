import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    Unique,
    JoinTable,
    DeleteDateColumn,
    Index,
    Column,
    OneToMany
} from 'typeorm';
import UsersEntity from '@src/domain/entities/user.entity';
import ExamsEntity from '@src/domain/entities/exam.entity';
import UserAnswerEntity from './userAnswer.entity';

/** Define group role entity */
@Entity()
@Unique(['user', 'exam'])
class ExamUserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({})
    retry: number;

    @Column({
        default: false
    })
    status: boolean;

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

    @Index('IDX_USER_ID')
    @ManyToOne(() => UsersEntity, (user) => user.examUser, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'userId'
    })
    user: UsersEntity;

    @Index('IDX_EXAM_ID')
    @ManyToOne(() => ExamsEntity, (exam) => exam.examUser, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'examId'
    })
    exam: ExamsEntity;
}

export default ExamUserEntity;
