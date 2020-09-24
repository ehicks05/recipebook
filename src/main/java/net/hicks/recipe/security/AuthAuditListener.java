package net.hicks.recipe.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.boot.actuate.audit.listener.AuditApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class AuthAuditListener implements ApplicationListener<AuditApplicationEvent> {
    private static final Logger LOG = LoggerFactory.getLogger("security");

    @Override
    public void onApplicationEvent(AuditApplicationEvent event) {
        AuditEvent auditEvent = event.getAuditEvent();
        LOG.info("type={}, principal={}", auditEvent.getType(), auditEvent.getPrincipal());
    }
}