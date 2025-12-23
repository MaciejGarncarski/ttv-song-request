export class VoteManager {
  private votes: Set<string> = new Set()
  private readonly votesNeeded = 2

  public addVote(username: string): number {
    this.votes.add(username)
    return this.votes.size
  }

  public hasVoted(username: string): boolean {
    return this.votes.has(username)
  }

  public getVotesNeeded(): number {
    return this.votesNeeded
  }

  public getCurrentCount(): number {
    return this.votes.size
  }

  public reset(): void {
    this.votes.clear()
  }
}
