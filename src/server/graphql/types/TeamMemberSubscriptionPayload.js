import GraphQLSubscriptionType from 'server/graphql/GraphQLSubscriptionType';
import AcceptTeamInviteEmailPayload from 'server/graphql/types/AcceptTeamInviteEmailPayload';
import AcceptTeamInviteNotificationPayload from 'server/graphql/types/AcceptTeamInviteNotificationPayload';
import InviteTeamMembersPayload from 'server/graphql/types/InviteTeamMembersPayload';
import RemoveTeamMemberOtherPayload from 'server/graphql/types/RemoveTeamMemberOtherPayload';
import RemoveTeamMemberSelfPayload from 'server/graphql/types/RemoveTeamMemberSelfPayload';

const types = [
  AcceptTeamInviteNotificationPayload,
  AcceptTeamInviteEmailPayload,
  RemoveTeamMemberOtherPayload,
  RemoveTeamMemberSelfPayload,
  InviteTeamMembersPayload
];

export default new GraphQLSubscriptionType('TeanMemberSubscriptionPayload', types);
