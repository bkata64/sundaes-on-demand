import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("initial conditions", () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  const agreeCheckbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  expect(confirmButton).toBeDisabled();
  expect(agreeCheckbox).not.toBeChecked();
});

test("checking and unchecking checkbox", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  const agreeCheckbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });

  await user.click(agreeCheckbox);
  expect(confirmButton).toBeEnabled();

  await user.click(agreeCheckbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
