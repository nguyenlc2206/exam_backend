import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, DeleteDateColumn } from 'typeorm'
import GroupsRolesEntity from './groupRole.entity'
import UsersEntity from './user.entity'

/** Define group entity */
@Entity()
class GroupsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 25,
        unique: true
    })
    name: string

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

    @OneToMany(() => GroupsRolesEntity, (groupRole) => groupRole.group)
    groupsRoles: GroupsRolesEntity[]

    @OneToMany(() => UsersEntity, (user) => user.group)
    users: UsersEntity[]
}

export default GroupsEntity
