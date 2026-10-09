import { describe, it, expect } from "vitest"
import { render, screen} from "@testing-library/react"
import App from "./App"


describe("Feature: Appliction shell", () =>{
     /**
    Scenario: The app shows its title
     Given the app is rendered
     When I look at the page
     Then I see the heading "Inprocode"
  */
 it("shows the inprocode title", () =>{
    render(<App />)

    expect(screen.getByRole("heading", {name: "Inprocode"})).toBeInTheDocument()
 })
})