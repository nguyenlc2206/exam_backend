import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    Unique,
    JoinTable,
    DeleteDateColumn,
    OneToMany,
    Index
} from 'typeorm';
import GroupsEntity from '@src/domain/entities/group.entity';
import ExamsEntity from '@src/domain/entities/exam.entity';
import ExamUserEntity from '@src/domain/entities/examUser.entity';

export const UNIQUE_USER_EMAIL_CONSTRAINT = 'unique_user_email_constraint';
/** Define user entity */
@Entity()
@Unique(UNIQUE_USER_EMAIL_CONSTRAINT, ['email'])
class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true, type: 'varchar', length: 30 })
    username: string;

    @Column({ nullable: true, type: 'varchar', length: 200 })
    avatar: string;

    @Column({ nullable: true, type: 'varchar', length: 25 })
    phoneNumber: string;

    @Index('IDX_USER_EMAIL')
    @Column({ type: 'varchar', length: 40 })
    email: string;

    @Column({ type: 'varchar', length: 200, select: false })
    password: string;

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

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    })
    passwordChangedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({
        name: 'groupId',
        type: 'varchar',
        default: '46fa1172-8262-411e-85ef-8367f01be058'
    })
    @ManyToOne(() => GroupsEntity, (group) => group.users, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'groupId'
    })
    group: GroupsEntity;

    @OneToMany(() => ExamsEntity, (exam) => exam.user)
    exams: UsersEntity[];

    @OneToMany(() => ExamUserEntity, (examUser) => examUser.user)
    examUser: ExamUserEntity[];
}

export default UsersEntity;
