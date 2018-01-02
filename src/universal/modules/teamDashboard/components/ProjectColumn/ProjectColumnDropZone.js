// @flow
import type {Node} from 'react';
import type {Project, ProjectID, Status} from 'universal/types/project';

import React from 'react';
import {DropTarget} from 'react-dnd';

import withAtmosphere from 'universal/decorators/withAtmosphere/withAtmosphere';
import sortOrderBetween from 'universal/dnd/sortOrderBetween';
import withDragCache, {DragCache} from 'universal/dnd/withDragCache';
import UpdateProjectMutation from 'universal/mutations/UpdateProjectMutation';
import {PROJECT} from 'universal/utils/constants';

type Props = {
  connectDropTarget: (node: Node) => Node,
  area: string,
  atmosphere: Object, // TODO: atmosphere needs a type definition
  dragCache: DragCache,
  getProjectById: (ProjectID) => Project,
  lastProject: ?Project, // the last project in a column; may be undefined if the column is empty
  status: Status
};

type UpdateProjectMutationArgs = {
  id: ProjectID,
  sortOrder: number,
  status?: Status
};

// Represents the trailing space at the end of a column.  Acts as a drop target
// for cards being dragged over a column rather than cards in that column.
const ProjectColumnDropZone = (props: Props) => (
  props.connectDropTarget(
    <div style={{height: '100%'}} />
  )
);

const spec = {
  hover: (props: Props, monitor) => {
    const {
      area,
      atmosphere,
      dragCache,
      getProjectById,
      lastProject,
      status
    } = props;
    const draggedProjectId = monitor.getItem().projectId;
    const draggedProject = getProjectById(draggedProjectId);

    if (!monitor.isOver({shallow: true})) {
      dragCache.clear();
      return;
    }
    if (dragCache.isSameDrag({draggedProjectId, status})) {
      return;
    }
    dragCache.update({draggedProjectId, status});

    const sortOrder = sortOrderBetween(lastProject, null, draggedProject, false);

    const updatedProject: UpdateProjectMutationArgs = {
      id: draggedProject.id,
      sortOrder
    };
    if (draggedProject.status !== status) {
      updatedProject.status = status;
    }
    UpdateProjectMutation(atmosphere, updatedProject, area);
  }
};

const collect = (connect) => ({
  connectDropTarget: connect.dropTarget()
});

export default withAtmosphere(
  withDragCache(
    DropTarget(PROJECT, spec, collect)(
      ProjectColumnDropZone
    )
  )
);
