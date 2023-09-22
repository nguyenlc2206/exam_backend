"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsController = void 0;
const group_create_controller_1 = require("./group.create.controller");
const group_update_controller_1 = require("./group.update.controller");
const group_getAll_controller_1 = require("./group.getAll.controller");
/** Define groups controller */
class GroupsController {
    constructor(service) {
        /** create method */
        this.create = async (req, res, next) => {
            const createGroup = new group_create_controller_1.CreateGroupController(this.service);
            return createGroup.execute(req, res, next);
        };
        /** update method */
        this.update = async (req, res, next) => {
            const updateGroup = new group_update_controller_1.UpdateGroupController(this.service);
            return updateGroup.execute(req, res, next);
        };
        /** getAll method */
        this.getAll = async (req, res, next) => {
            const getAllGroups = new group_getAll_controller_1.GetAllGroupsController(this.service);
            return getAllGroups.execute(req, res, next);
        };
        this.service = service;
    }
}
exports.GroupsController = GroupsController;
