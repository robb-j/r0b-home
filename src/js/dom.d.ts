declare global {
  interface Window {
    fathom: {
      trackGoal(goal: string, value: number)
    }
  }
}

export {}
