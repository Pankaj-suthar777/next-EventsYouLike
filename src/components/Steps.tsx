import React from "react";
import { Link } from "@nextui-org/react";

interface StepsProps {
  stepNames: string[];
  stepContent: React.ReactNode;
  activeStep: number;
}

const Steps = ({ stepNames, stepContent, activeStep }: StepsProps) => {
  return (
    <div className="stepper-wrapper">
      {stepNames.map((stepName, index) => {
        const isActiveStep = index === activeStep;
        return (
          <div className={`stepper-item ${isActiveStep ? "completed" : ""}`}>
            <div className={`step-counter ${isActiveStep ? "text-white" : ""}`}>
              {activeStep > index ? (
                <i className="ri-check-line"></i>
              ) : (
                index + 1
              )}
            </div>
            <div className="step-name">{stepName}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
{
  /* <div className="stepper-wrapper">
      <div className={`stepper-item ${activeStep === 1 ? "completed" : ""}`}>
        <div className={`step-counter ${activeStep === 1 ? "text-white" : ""}`}>
          <i className="ri-check-line"></i>
        </div>
        <div className="step-name">Sign In</div>
      </div>

      <div className={`stepper-item ${activeStep > 1 ? "completed" : ""}`}>
        <div className={`step-counter ${activeStep > 1 ? "text-white" : ""}`}>
          {activeStep > 2 ? <i className="ri-check-line"></i> : "2"}
        </div>
        <div className="step-name">Shipping</div>
      </div>

      <div className={`stepper-item ${activeStep > 2 ? "completed" : ""}`}>
        <div className={`step-counter ${activeStep > 2 ? "text-white" : ""}`}>
          {activeStep > 2 ? <i className="ri-check-line"></i> : "3"}
        </div>
        <div className="step-name text-center">Payment</div>
      </div>

      <div className={`stepper-item ${activeStep > 3 ? "completed" : ""}`}>
        <div className={`step-counter ${activeStep > 3 ? "text-white" : ""}`}>
          {activeStep > 3 ? <i className="ri-check-line"></i> : "3"}
        </div>
        <div className="step-name">Place Order</div>
      </div>
    </div> */
}
