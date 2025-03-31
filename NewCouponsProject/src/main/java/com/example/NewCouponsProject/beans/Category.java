package com.example.NewCouponsProject.beans;

/**
 * Category enum
 * contains categories for coupons and methods to convert them back and forth between enum and int.
 */
public enum Category {
    Food, Fashion, Cinema, Spa, Tech, Sport;

    /**
     * convert methods used to return the correlating category enum to the given int
     * @param num correlating int
     * @return corresponding category
     */
    public static Category convert(int num) {
        return switch (num) {
            case 1 -> Food;
            case 2 -> Fashion;
            case 3 -> Cinema;
            case 4 -> Spa;
            case 5 -> Tech;
            case 6 -> Sport;
            default -> null;
        };
    }

    /**
     * convert methods used to return the correlating integer from the given enum
     * @param category given category
     * @return corresponding integer
     */
    public static int convert(Category category) {
        return switch (category) {
            case Food -> 1;
            case Fashion -> 2;
            case Cinema -> 3;
            case Spa -> 4;
            case Tech -> 5;
            case Sport -> 6;
            default -> 0;
        };
    }
}

