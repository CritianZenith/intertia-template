import { Application } from "stimulus"
import { registerControllers } from 'stimulus-vite-helpers'

// Start the Stimulus application.
const application = Application.start()

// Controller files must be named *_controller.js.
// const controllers  = import('./**/*_controller.js')
registerControllers(application, [])
