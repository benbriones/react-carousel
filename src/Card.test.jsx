import React from "react";
import { describe, test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";


describe("Card Component", function () {
    test("renders without crashing", function () {
        render(<Card
            caption="testCap"
            src="test.png"
            currNum={2}
            totalNum={3} />
        );
    });

    test("matches snapshot", function () {
        const { container } = render(<Card
            caption="testCap"
            src="test.png"
            currNum={2}
            totalNum={3} />
        );

        expect(container).toMatchSnapshot();
    });
});