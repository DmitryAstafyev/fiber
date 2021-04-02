use super::{ Protocol, tools };
use std::cmp::{Eq, PartialEq};
use fiber::logger::{ Logger };
use uuid::Uuid;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum EFilterMatchCondition {
    PartialEqual,
    Equal,
    NotEqual,
}

#[derive(Debug, Clone)]
pub struct Filter {
    pub uuid: Option<Uuid>,
    pub key: Option<Protocol::Identification::SelfKey>,
    pub assigned: Option<Protocol::Identification::AssignedKey>,
    pub condition: EFilterMatchCondition,
}

#[derive(Debug, Clone)]
pub struct Identification {
    uuid: Uuid,
    key: Option<Protocol::Identification::SelfKey>,
    assigned: Option<Protocol::Identification::AssignedKey>,
}

impl Identification {
    pub fn new(uuid: Uuid) -> Self {
        Identification {
            uuid: uuid,
            key: None,
            assigned: None,
        }
    }

    pub fn key(&mut self, key: Protocol::Identification::SelfKey) {
        self.key = Some(key);
    }

    pub fn assign(&mut self, assigned: Protocol::Identification::AssignedKey) {
        self.assigned = Some(assigned);
    }

    pub fn filter(
        &self,
        filter: Filter,
    ) -> bool {
        let uuid_match = if let Some(uuid) = filter.uuid {
            match filter.condition {
                EFilterMatchCondition::Equal => {
                    self.uuid == uuid
                },
                EFilterMatchCondition::PartialEqual => {
                    self.uuid == uuid
                },
                EFilterMatchCondition::NotEqual => {
                    self.uuid != uuid
                },
            }
        } else {
            true
        };
        let key_match = if let Some(key) = filter.key {
            if let Some(o_key) = self.key.as_ref() {
                match filter.condition {
                    EFilterMatchCondition::Equal => {
                        if (key.id.is_some() && o_key.id == key.id)
                            && (key.location.is_some() && o_key.location == key.location)
                            && (key.uuid.is_some() && o_key.uuid == key.uuid)
                        {
                            true
                        } else {
                            false
                        }
                    },
                    EFilterMatchCondition::PartialEqual => {
                        if key.id.is_some() && o_key.id == key.id
                            || key.location.is_some() && o_key.location == key.location
                            || key.uuid.is_some() && o_key.uuid == key.uuid
                        {
                            true
                        } else {
                            false
                        }
                    },
                    EFilterMatchCondition::NotEqual => {
                        if (key.id.is_some() && o_key.id != key.id)
                            && (key.location.is_some() && o_key.location != key.location)
                            && (key.uuid.is_some() && o_key.uuid != key.uuid)
                        {
                            true
                        } else {
                            false
                        }
                    },
                }
            } else {
                false
            }
        } else {
            true
        };
        let assigned_match = if let Some(assigned) = filter.assigned {
            if let Some(o_assigned) = self.assigned.as_ref() {
                match filter.condition {
                    EFilterMatchCondition::Equal => {
                        if (assigned.auth.is_some() && o_assigned.auth == assigned.auth)
                            && (assigned.uuid.is_some() && o_assigned.uuid == assigned.uuid)
                        {
                            true
                        } else {
                            false
                        }
                    },
                    EFilterMatchCondition::PartialEqual => {
                        if (assigned.auth.is_some() && o_assigned.auth == assigned.auth)
                            || (assigned.uuid.is_some() && o_assigned.uuid == assigned.uuid)
                        {
                            true
                        } else {
                            false
                        }
                    },
                    EFilterMatchCondition::NotEqual => {
                        if (assigned.auth.is_some() && o_assigned.auth != assigned.auth)
                            && (assigned.uuid.is_some() && o_assigned.uuid != assigned.uuid)
                        {
                            true
                        } else {
                            false
                        }
                    },
                }
            } else {
                false
            }
        } else {
            true
        };
        key_match && assigned_match && uuid_match
    }

    pub fn assigned(&self) -> bool {
        if self.assigned.is_none() {
            tools::logger.warn("Client doesn't have producer identification");
        }
        self.key.is_some()
    }
}
