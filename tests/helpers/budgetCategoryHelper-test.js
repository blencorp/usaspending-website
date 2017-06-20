/**
 * Created by michaelbray on 3/24/17.
 */

import * as BudgetCategoryHelper from 'helpers/budgetCategoryHelper';

describe('Budget Category helper functions', () => {
    describe('formatBudgetFunction', () => {
        it('should return properly formatted Budget Functions', () => {
            const response = BudgetCategoryHelper.formatBudgetFunction({
                title: 'Income Security',
                functionType: 'Function'
            });
            expect(response).toEqual('Income Security | Function');
        });

        it('should return properly formatted Budget Sub-Functions', () => {
            const response = BudgetCategoryHelper.formatBudgetFunction({
                title: 'Other income security',
                functionType: 'Sub-Function'
            });
            expect(response).toEqual('Other income security | Sub-Function');
        });
    });
});
