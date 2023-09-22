"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsController = void 0;
const group_create_controller_1 = require("./group.create.controller");
const group_update_controller_1 = require("./group.update.controller");
const group_getAll_controller_1 = require("./group.getAll.controller");
/** Define groups controller */
class GroupsController {
    constructor(service) {
        /** create method */
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const createGroup = new group_create_controller_1.CreateGroupController(this.service);
            return createGroup.execute(req, res, next);
        });
        /** update method */
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const updateGroup = new group_update_controller_1.UpdateGroupController(this.service);
            return updateGroup.execute(req, res, next);
        });
        /** getAll method */
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const getAllGroups = new group_getAll_controller_1.GetAllGroupsController(this.service);
            return getAllGroups.execute(req, res, next);
        });
        this.service = service;
    }
}
exports.GroupsController = GroupsController;
