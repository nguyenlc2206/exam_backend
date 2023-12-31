import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import UsersEntity from '@src/domain/entities/user.entity';
import ExamsCategoryEntity from '@src/domain/entities/exam.category.entity';
import ExamUserEntity from '@src/domain/entities/examUser.entity';
import QuestionsEntity from '@src/domain/entities/question.entity';
import UserAnswerEntity from '@src/domain/entities/userAnswer.entity';

/** Define exam entity */
@Entity()
class ExamsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar' })
    subTitle: string;

    @Column({ nullable: true, type: 'varchar' })
    image: string;

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

    @ManyToOne(() => UsersEntity, (user) => user.exams, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'userId'
    })
    user: UsersEntity;

    @ManyToOne(() => ExamsCategoryEntity, (user) => user.exams, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'categoryId'
    })
    category: ExamsCategoryEntity;

    @OneToMany(() => ExamUserEntity, (examUser) => examUser.exam)
    examUser: ExamUserEntity[];

    @OneToMany(() => QuestionsEntity, (question) => question.exam)
    questions: QuestionsEntity[];

    @OneToMany(() => UserAnswerEntity, (question) => question.exam)
    userAnswer: UserAnswerEntity[];
}

export default ExamsEntity;
