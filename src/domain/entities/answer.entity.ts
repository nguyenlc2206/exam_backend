import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import QuestionsEntity from './question.entity';

/** Define answer entity */
@Entity()
class AnswersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

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

    @ManyToOne(() => QuestionsEntity, (question) => question.answers, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'questionId'
    })
    question: QuestionsEntity;
}

export default AnswersEntity;
