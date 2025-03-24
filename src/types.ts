export interface Context {
  package: {
    name: string
    scripts: {
      [key: string]: string
    }
  }
}
