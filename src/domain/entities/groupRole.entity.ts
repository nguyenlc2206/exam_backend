import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    Unique,
    JoinTable,
    DeleteDateColumn
} from 'typeorm';
import GroupsEntity from '@src/domain/entities/group.entity';
import RolesEntity from '@src/domain/entities/role.entity';

/** Define group role entity */
@Entity()
@Unique(['group', 'role'])
class GroupsRolesEntity {
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

    @ManyToOne(() => GroupsEntity, { onDelete: 'CASCADE' })
    @JoinTable({
        name: 'groupId'
    })
    group: GroupsEntity;

    @ManyToOne(() => RolesEntity, { onDelete: 'CASCADE' })
    @JoinTable({
        name: 'roleId'
    })
    role: RolesEntity;
}

export default GroupsRolesEntity;
