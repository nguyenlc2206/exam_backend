import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import UsersEntity from '@src/domain/entities/user.entity';
import ExamsEntity from '@src/domain/entities/exam.entity';
import QuestionsEntity from '@src/domain/entities/question.entity';

/** Define userAnswer entity */
@Entity()
@Unique(['retryId', 'exam', 'question'])
class UserAnswerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({})
    retryId: number;

    @Column({
        default: false
    })
    status: boolean;

    @Column({ nullable: true, type: 'uuid', select: false })
    answerUserId: string;

    @Column({ nullable: true, type: 'uuid', select: false })
    answerCorrectId: string;

    @ManyToOne(() => UsersEntity, (user) => user.userAnswer, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'userId'
    })
    user: UsersEntity;

    @ManyToOne(() => ExamsEntity, (exam) => exam.userAnswer, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'examId'
    })
    exam: ExamsEntity;

    @ManyToOne(() => QuestionsEntity, (question) => question.userAnswer, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'questionId'
    })
    question: QuestionsEntity;
}

export default UserAnswerEntity;
