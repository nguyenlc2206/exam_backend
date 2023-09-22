import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import ExamsEntity from './exam.entity'
import AnswersEntity from './answer.entity'

/** Define question entity */
@Entity()
class QuestionsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'varchar' })
    subTitle: string

    @Column({ nullable: true, type: 'varchar' })
    image: string

    @Column({
        default: true
    })
    status: boolean

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    })
    createdAt: Date

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    })
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => ExamsEntity, (exam) => exam.questions, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'examId'
    })
    exam: ExamsEntity

    @OneToMany(() => AnswersEntity, (answer) => answer.question)
    answers: AnswersEntity[]

    @Column({ nullable: true, type: 'uuid' })
    answerCorrectId: string
}

export default QuestionsEntity
