declare interface TemplateOption {
  name: string
  value: string
}

declare interface Context {
  package: {
    name: string
    scripts: {
      [key: string]: string
    }
  }
}

declare interface Template {
  (context: Context): Promise<void>
}
