import { Sport } from '../enums'

export class GamesListDto {
  readonly sport: Sport
  readonly onlyNotVoted?: boolean
}
