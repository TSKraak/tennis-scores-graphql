import gql from "graphql-tag";

export const GET_ALL_MATCHES = gql`
  subscription LiveMatches {
    matches(order_by: { finished: asc, started_at: asc }) {
      id
      started_at
      p1 {
        id
        name
      }
      p2 {
        id
        name
      }
      setts {
        p1_score
        p2_score
      }
      winner {
        id
        name
      }
      finished
    }
  }
`;
