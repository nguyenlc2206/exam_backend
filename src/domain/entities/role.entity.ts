import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import GroupsRolesEntity from '@src/domain/entities/groupRole.entity';

/** Define role entity */
@Entity()
class RolesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, type: 'varchar', length: 50 })
    url: string;

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

    @OneToMany(() => GroupsRolesEntity, (groupRole) => groupRole.role)
    groupsRoles: GroupsRolesEntity[];
}

export default RolesEntity;
