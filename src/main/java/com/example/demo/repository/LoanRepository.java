package com.example.demo.repository;

import com.example.demo.domain.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {

    //retrieve loan by loan id
    Optional<Loan> findById(Long loanId);

    //finding loans by userid
    @Query("SELECT l FROM Loan l WHERE l.user_account.userId = :userId")
    List<Loan> findLoansByUserId(@Param("userId") String userId);
}