// The 'test_minimask_exchange_router' test program.
import minimask_exchange_router.aleo;
import credits.aleo;
import token_registry.aleo;

program test_minimask_exchange_router.aleo {

    // Test the initialization of a pool (100 ALEO, 5 USDCx, 1% fee)
   @test
    script test_initialize_pool_flow() {
        // 1. Define the actual values first
        let usdcx_id: field = 12345field; // Use a real number followed by 'field'
        let aleo_amount: u128 = 100_000_000u128; 
        let usdcx_amount: u128 = 5_000_000u128;   
        let lp_fee: u16 = 100u16;                
        let plat_fee: u16 = 0u16;

        // 2. Pass the VARIABLES, not the types
        let f: Future = minimask_exchange_router.aleo/initialize_pool(
            usdcx_id,       // Pass the variable
            aleo_amount,    // Pass the variable
            usdcx_amount,   // Pass the variable
            lp_fee,         // Pass the variable
            plat_fee        // Pass the variable
        );

        f.await();
    }

    // Test a deposit that should fail if the user provides 0 ALEO
    @test
    @should_fail
     script test_deposit_invalid_amount() {
        let usdcx_id: field = 12345field;
        let aleo_in: u128 = 0u128; // This should trigger an error in the logic
        let min_out: u128 = 1u128;

        let f: Future = minimask_exchange_router.aleo/deposit_aleo_for_swap(
            usdcx_id,
            aleo_in,
            min_out
        );
 

        f.await();
    }
transition keep_compiler_happy() {
        return;
    }
@admin(address="aleo1l2lyqhh0n206drgzhw2a70atg7te8kgedlc2e9tjz0m0zr65nyysla8cnw")
async constructor() {}
}