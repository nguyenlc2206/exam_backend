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
import UsersEntity from './user.entity'
import ExamsCategoryEntity from './exam.category.entity'
import ExamUserEntity from './examUser.entity'
import QuestionsEntity from './question.entity'

/** Define exam entity */
@Entity()
class ExamsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 100 })
    title: string

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

    @ManyToOne(() => UsersEntity, (user) => user.exams, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'userId'
    })
    user: UsersEntity

    @ManyToOne(() => ExamsCategoryEntity, (user) => user.exams, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'categoryId'
    })
    category: ExamsCategoryEntity

    @OneToMany(() => ExamUserEntity, (examUser) => examUser.exam)
    examUser: ExamUserEntity[]

    @OneToMany(() => QuestionsEntity, (question) => question.exam)
    questions: QuestionsEntity[]
}

export default ExamsEntity
