export type Vote = {
    kind: string;
    drepID?: string;
};
export type GovernanceActions = {
    governanceVoteChanged: (vote: any) => void;
    dRepIdChanged: (id: string) => void;
};
export declare const GovernanceActionType: Readonly<{
    GovernanceVoteChanged: "governanceVoteChanged";
    DRepIdChanged: "dRepIdChanged";
}>;
export type GovernanceAction = {
    type: typeof GovernanceActionType.GovernanceVoteChanged;
    governanceVote: Vote;
} | {
    type: typeof GovernanceActionType.DRepIdChanged;
    dRepId: '';
};
export type GovernanceState = {
    governanceVote: any;
    dRepId?: string;
};
export declare const defaultGovernanceState: GovernanceState;
export declare const defaultGovernanceActions: GovernanceActions;
export declare const GovernanceReducer: (state: GovernanceState, action: GovernanceAction) => GovernanceState;
