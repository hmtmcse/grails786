package org.codenarc.rule.grails

import groovy.transform.CompileStatic
import org.codehaus.groovy.ast.AnnotatedNode
import org.codehaus.groovy.ast.AnnotationNode
import org.codehaus.groovy.ast.ImportNode
import org.codehaus.groovy.ast.ModuleNode
import org.codenarc.rule.AbstractAstVisitor
import org.codenarc.rule.AbstractAstVisitorRule

@CompileStatic
class GrailsTransactionalRule extends AbstractAstVisitorRule {
    int priority = 2
    String name = 'GrailsTransactional'
    Class astVisitorClass = GrailsTransactionalVisitor
}

@CompileStatic
class GrailsTransactionalVisitor extends AbstractAstVisitor {

    private static final String SPRING_TRANSACTIONAL = 'org.springframework.transaction.annotation.Transactional'
    private static final String ERROR_MSG = 'Do not use Spring @Transactional, use @grails.gorm.transactions.Transactional instead'

    @Override
    void visitAnnotations(AnnotatedNode node) {
        node.annotations.each { AnnotationNode annotationNode ->
            String annotation = annotationNode.classNode.text
            if (annotation == SPRING_TRANSACTIONAL) {
                addViolation(node, ERROR_MSG)
            }
        }

        super.visitAnnotations(node)
    }

    @Override
    void visitImports(ModuleNode node) {
        node.imports.each { ImportNode importNode ->
            String importClass = importNode.className

            if (importClass == SPRING_TRANSACTIONAL) {
                node.lineNumber = importNode.lineNumber
                addViolation(node, ERROR_MSG)
            }
        }

        super.visitImports(node)
    }
}
