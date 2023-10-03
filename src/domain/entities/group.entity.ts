import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, DeleteDateColumn, Index } from 'typeorm';
import GroupsRolesEntity from '@src/domain/entities/groupRole.entity';
import UsersEntity from '@src/domain/entities/user.entity';

/** Define group entity */
@Entity()
class GroupsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index('IDX_GROUPS_NAME')
    @Column({
        type: 'varchar',
        length: 25,
        unique: true
    })
    name: string;

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

    @OneToMany(() => GroupsRolesEntity, (groupRole) => groupRole.group)
    groupsRoles: GroupsRolesEntity[];

    @OneToMany(() => UsersEntity, (user) => user.group)
    users: UsersEntity[];
}

export default GroupsEntity;
