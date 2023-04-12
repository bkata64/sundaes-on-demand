import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  const agreeCheckbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  expect(confirmButton).toBeDisabled();
  expect(agreeCheckbox).not.toBeChecked();
});

test("checking and unchecking checkbox", () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  const agreeCheckbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });

  fireEvent.click(agreeCheckbox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(agreeCheckbox);
  expect(confirmButton).toBeDisabled();
});
