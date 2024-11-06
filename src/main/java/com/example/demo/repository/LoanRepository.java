package com.example.demo.repository;

import com.example.demo.domain.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoanRepository extends JpaRepository <Loan, Long >{
    Optional<Loan> findById(Long loanId);

}

